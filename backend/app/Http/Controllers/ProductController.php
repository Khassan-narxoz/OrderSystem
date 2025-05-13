<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    private function checkIfAdmin(): bool
    {
        return auth()->user() && auth()->user()->role === 'Admin';
    }

    public function index(): JsonResponse
    {
        return response()->json(Product::all(), 200);
    }

    public function store(Request $request): JsonResponse
    {
        if (!$this->checkIfAdmin()) {
            return response()->json(['message' => 'Доступ запрещён. Только для администраторов.'], 403);
        }

        logger('ProductController@store вызван', ['user' => auth()->user()]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'nullable|string',
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        if (!$this->checkIfAdmin()) {
            return response()->json(['message' => 'Доступ запрещён. Только для администраторов.'], 403);
        }

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'image_url' => 'nullable|string',
        ]);

        $product->update($validated);
        return response()->json($product);
    }

    public function destroy($id): JsonResponse
    {
        if (!$this->checkIfAdmin()) {
            return response()->json(['message' => 'Доступ запрещён. Только для администраторов.'], 403);
        }

        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Товар успешно удалён']);
    }
}
