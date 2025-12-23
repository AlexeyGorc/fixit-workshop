<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'service_id',
        'name',
        'description',
        'image_url',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
