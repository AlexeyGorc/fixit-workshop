<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id','service_id','name','email','phone',
        'details','items_json','total','order_date','order_status'
    ];

    protected $casts = [
        'items_json' => 'array',
        'total' => 'decimal:2',
        'order_date' => 'date',
    ];

    public function service() { return $this->belongsTo(Service::class); }
    public function user() { return $this->belongsTo(User::class); }
}

