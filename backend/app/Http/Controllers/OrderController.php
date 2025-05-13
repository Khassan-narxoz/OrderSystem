<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Support\Facades\Mail;
use App\Jobs\SendOrderNotificationJob;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'shipping_cost' => 'required|numeric',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1'
        ]);

        DB::beginTransaction();

        try {
            // Проверка наличия достаточного количества товаров
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);
                if ($product->stock < $item['quantity']) {
                    return response()->json(['message' => "Недостаточно товара '{$product->title}' на складе!"], 400);
                }
            }

            // Создание заказа
            $order = Order::create([
                'user_id' => $user->id,
                'shipping_cost' => $validated['shipping_cost'],
            ]);

            // Привязка продуктов к заказу и обновление остатков
            foreach ($validated['items'] as $item) {
                OrderProduct::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                ]);

                $product = Product::find($item['product_id']);
                $product->stock -= $item['quantity'];
                $product->save();
            }

            DB::commit();

            // Отправка уведомления (проверьте работоспособность очереди)
            SendOrderNotificationJob::dispatch($order);

            return response()->json(['message' => 'Заказ успешно оформлен'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Произошла ошибка: ' . $e->getMessage()], 500);
        }
    }

    public function getUserOrders(Request $request): JsonResponse
    {
        $user = $request->user();

        $orders = Order::where('user_id', $user->id)
            ->with(['products' => function ($query) {
                $query->select('products.id', 'title', 'price', 'image_url')->withPivot('quantity');
            }])
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }

    public function getAllOrders(Request $request): JsonResponse
    {
        if ($request->user()->role !== 'Admin') {
            return response()->json(['message' => 'Доступ запрещён'], 403);
        }

        $orders = Order::with(['user:id,name,email', 'products' => function ($query) {
            $query->select('products.id', 'title', 'price', 'image_url')->withPivot('quantity');
        }])
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }
}
