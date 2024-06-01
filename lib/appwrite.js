import { Account, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint : 'https://cloud.appwrite.io/v1',
    plattform: 'com.jsm.auth',
    databaseId: '6639776f000302e6551e',
    projectId : '6639763a003abf487575',
    userCollectionId: '663977a50039e01f3ffa'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.plattform);

const account   = new Account(client);
const databases = new Databases(client); 

export const createUser = async ( email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if ( !newAccount ) throw Error;

    }catch ( error ) {
        throw new Error( error );
    }
}

export const signIn = async ( email, password ) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch ( error ) {
        throw new Error( error );
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if( !currentAccount ) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if( !currentUser ) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        throw new Error( error );
    }
}

