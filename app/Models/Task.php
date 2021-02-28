<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'task';

    /**
    * The database primary key value.
    *
    * @var string
    */
    protected $primaryKey = 'id';


    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
                  'name',
                  'description',
                  'completed',
                  'stage',
                  'priority',
                  'start_date',
                  'end_date',
                  'project_id'
              ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function comment(){
        return $this->hasMany(Comment::class); 
    }

    public function event(){
        return $this->hasMany(TaskUserEvent::class); 
    }

    public function view(){
        return $this->hasMany(View::class); 
    }
}
