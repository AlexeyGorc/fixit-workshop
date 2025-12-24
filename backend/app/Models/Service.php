<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'category',
        'subcategory',
        'description',
        'price',
        'min_days',
        'max_days',
        'compare_specs',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'compare_specs' => 'array',
        'min_days' => 'integer',
        'max_days' => 'integer',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function priceItems(): HasMany
    {
        return $this->hasMany(PriceListItem::class, 'service_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
