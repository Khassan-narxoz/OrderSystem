<?php

namespace App\Jobs;

use App\Mail\OrderCreatedMail;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendOrderNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $orderId;

    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }

    public function handle(): void
    {
        $order = Order::with('user')->find($this->orderId);

        if ($order && $order->user) {
            Mail::to($order->user->email)->send(new OrderCreatedMail($order));
        }
    }
}
