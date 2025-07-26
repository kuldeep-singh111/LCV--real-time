import api from "./axios";


export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export interface TaskData {
    title: string;
    description: string;
    status?: string;
}

// Login
export const LoginUser = async (formData: LoginForm): Promise<any> => {
    try {
        const response = await api.post("/login", formData, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed, please try again");
    }
};

// Register
export const Register = async (formData: RegisterForm): Promise<any> => {
    try {
        const response = await api.post("/register", formData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Internal server error, please try again later");
    }
};


export const getAllTasks = async (): Promise<any[]> => {
    try {
        const response = await api.get("/all-tasks", {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Internal server error");
    }
};


export const createTask = async (taskData: TaskData): Promise<any> => {
    try {
        const response = await api.post("/create-task", taskData, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Internal server error");
    }
};

export const deleteTask = async (taskId: string): Promise<any> => {
    console.log("task id hai bahaya", taskId)
    try {
        const response = await api.delete(`/delete-task/${taskId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Internal server error");
    }
}


export const updateTask = async (taskId: string, taskData: TaskData): Promise<any> => {
    try {
        const response = await api.put(`/update-task/${taskId}`, taskData, {
            withCredentials: true
        })
        return response.data;
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message || "Internal server error");
    }
}

