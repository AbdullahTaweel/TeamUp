<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectUserEvent extends Model
{
    use HasFactory;


    protected $table = 'project_user_event';

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
                  'isOwner',
                  'report',
                  'users_id',
                  'project_id'
              ];

    public function users(){
        return $this->belongsTo(User::class);
    }


    public function project(){
        return $this->belongsTo(Project::class);
    }
}
