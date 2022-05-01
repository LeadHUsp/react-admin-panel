import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = {
    signIn(payload) {
        return instance.post(`admin/signin`, JSON.stringify(payload));
    },
    signOut() {
        return instance.post('admin/signout');
    },
    verify() {
        return instance.get('admin/verify', {
            headers: { Authorization: `${window.localStorage.getItem('token')}` },
        });
    },
};
export const categoriesApi = {
    getCategories() {
        return instance.get('category/');
    },
    getSingleCategory(id) {
        return instance.get(`category/${id}`);
    },
    addCategories(payload) {
        return instance.post('category/', payload, {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
            },
        });
    },
    updateCategory(payload, categoryId) {
        return instance.put(`category/${categoryId}`, payload, {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
            },
        });
    },
    deleteSingleCategoryItem(id) {
        return instance.delete(`category/${id}`, {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
            },
        });
    },
};
export const galleryApi = {
    getGallleryItems(page = 1) {
        return instance.get(`gallery?page=${page}`);
    },
    getSingleGalleryItem(id) {
        return instance.get(`gallery/${id}`);
    },
    addGalleryItem(payload, onUploadProgress) {
        return instance.post('gallery', payload, {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: onUploadProgress,
        });
    },
    updateGalleryItem(payload) {
        return instance.put(`gallery/${payload.id}`, payload, {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
            },
        });
    },
    deleteGalleryItems(payload) {
        return instance.delete('gallery', {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
            },
            data: payload,
        });
    },
};
export const AttributeApi = {
    getAllAttributeGroup(str = 'limit=3', page = 1) {
        return instance.get(`attribute-group/page=${page}?${str}`);
    },
    postSingleAttributeGroup(payload) {
        return instance.post('attribute-group/', payload, {
            headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
            },
        });
    },
    getSingleAttrData(id) {
        return instance.get(`attribute-group/${id}`);
    },
};
