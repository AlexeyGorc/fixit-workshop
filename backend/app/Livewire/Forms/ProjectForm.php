<?php

namespace App\Livewire\Forms;

use App\Models\Project;
use Livewire\Attributes\Validate;
use Livewire\Form;

class ProjectForm extends Form
{
    public ?int $id = null;

    #[Validate('required|exists:services,id')]
    public int $service_id = 0;

    #[Validate('required|string|max:255')]
    public string $name = '';

    #[Validate('nullable|string')]
    public ?string $description = null;

    #[Validate('nullable|string')]
    public ?string $image_url = null;

    public function fillFrom(Project $project): void
    {
        $this->id = $project->id;
        $this->service_id = (int) $project->service_id;
        $this->name = $project->name;
        $this->description = $project->description;
        $this->image_url = $project->image_url;
    }

    public function toPayload(): array
    {
        return [
            'service_id' => $this->service_id,
            'name' => $this->name,
            'description' => $this->description,
            'image_url' => $this->image_url,
        ];
    }

    public function resetForm(): void
    {
        $this->id = null;
        $this->service_id = 0;
        $this->name = '';
        $this->description = null;
        $this->image_url = null;
    }
}
