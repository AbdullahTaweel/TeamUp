<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'project';

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
                  'start_date',
                  'end_date'
              ];

    public function users(){
        return $this->belongsTo(User::class);
    }


    public function task(){
        return $this->hasMany(Task::class); 
    }



    public function event(){
        return $this->hasMany(ProjectUserEvent::class); 
    }


}
