import axios from 'axios';
import CookieService from './Service/CookieService';

const BASE_URL = '/api'

const cookie = CookieService.get('access_token');

const token = {
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + cookie
    },
}


export default{

    checkLogin: (login) =>
    axios.post(`${BASE_URL}/login`,login),

    register: (register) =>
    axios.post(`${BASE_URL}/register`,register),

    details: () =>
    axios.get(`${BASE_URL}/details`, token),

    logout: () =>
    axios.get(`${BASE_URL}/logout`, token),


    getProjects: () =>
    axios.get(`${BASE_URL}/projects`, token),

    getOneProject: (project_id) =>
    axios.get(`${BASE_URL}/projects/${project_id}/show`, token),

    createProject: (project) =>
    axios.post(`${BASE_URL}/projects`, project, token),


    editProject: (id) =>
    axios.get(`${BASE_URL}/projects/${id}/edit`, token),

    updateProject: (project, id) =>
    axios.put(`${BASE_URL}/projects/${id}`,project, token),


    deleteProject: (id) =>
    axios.delete(`${BASE_URL}/projects/${id}`, token),

    getProjectMembers: (projectId) =>
    axios.get(`${BASE_URL}/projects/${projectId}`, token),

    getProjectTeamCount: (project_id) =>
    axios.get(`${BASE_URL}/projects/${project_id}/teamcount`, token),

    setProjectCompleted: (value, project_id) =>
    axios.put(`${BASE_URL}/projects/${project_id}/completed`, value, token),

    getReport: (project_id) =>
    axios.get(`${BASE_URL}/projects/${project_id}/getreport`, token),

    setTaskCompleted: (value, task_id) =>
    axios.put(`${BASE_URL}/tasks/${task_id}/completed`, value, token),
    // getTasks: (id) =>
    // axios.get(`${BASE_URL}/projects/${id}/tasks`, token),

    getTasks: (id) =>
    axios.get(`${BASE_URL}/projects/${id}/tasks`, token),

    showTask: (id) =>
    axios.get(`${BASE_URL}/tasks/${id}`, token),

    createTask: (task, projectId) =>
    axios.post(`${BASE_URL}/projects/${projectId}/tasks`,task, token),

    editTask: (id) =>
    axios.get(`${BASE_URL}/tasks/${id}/edit`, token),

    updateTask: (task, id) =>
    axios.put(`${BASE_URL}/tasks/${id}`,task, token),

    deleteTask: (id) =>
    axios.delete(`${BASE_URL}/tasks/${id}`, token),

    changeTaskStage: (id, stage) =>
    axios.put(`${BASE_URL}/tasks/${id}/stage`, stage, token),

    addTaskMember: (member, taskId) =>
    axios.post(`${BASE_URL}/tasks/${taskId}/taskMembers`, member, token),


    getComments: (id) =>
    axios.get(`${BASE_URL}/tasks/${id}/comments`, token),


    createComment: (comment, taskId) =>
    axios.post(`${BASE_URL}/tasks/${taskId}/comments`,comment, token),

    editComment: (id) =>
    axios.get(`${BASE_URL}/comments/${id}/edit`, token),

    updateComment: (comment, id) =>
    axios.put(`${BASE_URL}/comments/${id}`,comment, token),

    deleteComment: (id) =>
    axios.delete(`${BASE_URL}/comments/${id}`, token),

    getCommenter:(id) =>
    axios.get(`${BASE_URL}/comments/${id}/commenter`, token),

    getUsers: () =>
    axios.get(`${BASE_URL}/users`, token),

    addMember: (member, id) =>
    axios.post(`${BASE_URL}/projects/${id}/member`,member, token),

    getTaskTeam: (id) =>
    axios.get(`${BASE_URL}/tasks/${id}/team`, token),

    getViewer: (id)=>
    axios.get(`${BASE_URL}/tasks/${id}/viewers`, token),

    addTaskViewers: (task)=>
    axios.post(`${BASE_URL}/tasks/viewers/add`, task, token),

    getOwner: () =>
    axios.get(`${BASE_URL}/projects/user/isOwner`, token),

}
