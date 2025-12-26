<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
        'name',
        'email',
        'phone',
        'details',
        'items_json',
        'total',
        'order_date',
        'order_status',
    ];

    protected $casts = [
        'items_json' => 'array',
        'order_date' => 'date',
        'total' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
