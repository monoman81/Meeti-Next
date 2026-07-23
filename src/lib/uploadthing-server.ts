import {UTApi} from 'uploadthing/server';

const utapi = new UTApi();

export const deleteUTFiles = async (file: string): Promise<void> => {
    try {
        const key = file.substring(file.lastIndexOf('/') + 1);
        await utapi.deleteFiles(key);
    }
    catch (error) {
        console.error(error);
    }
}