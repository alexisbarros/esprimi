import { Main } from "./index";

const envFrontDev = `
export const environment = {
    firebase: {
        projectId: "kunlatek-quickstart",
        appId: "1:61322235717:web:2c454bc7bd593cc6d3f82c",
        storageBucket: "kunlatek-quickstart.appspot.com",
        apiKey: "AIzaSyCLOB3dc091tFAuj9LEsarILOBVzL-dqhQ",
        authDomain: "kunlatek-quickstart.firebaseapp.com",
        messagingSenderId: "61322235717",
        measurementId: "G-V8W65TSX41",
    },
    baseUrl: "http://localhost:3000",
    production: false
};`;

const envFrontProd = `
export const environment = {
    firebase: {
        projectId: "kunlatek-quickstart",
        appId: "1:61322235717:web:2c454bc7bd593cc6d3f82c",
        storageBucket: "kunlatek-quickstart.appspot.com",
        apiKey: "AIzaSyCLOB3dc091tFAuj9LEsarILOBVzL-dqhQ",
        authDomain: "kunlatek-quickstart.firebaseapp.com",
        messagingSenderId: "61322235717",
        measurementId: "G-V8W65TSX41",
    },
    baseUrl: "http://localhost:3000",
    production: true
};`;

const envBackend = `
PORT=3000
SERVER_ROOT_URI=http://localhost
CLIENT_REDIRECT_URI=http://localhost:4200
MONGO_URL=mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true
DB=esprimi
NODEMAILER_USER=
NODEMAILER_PASS=
ADMIN_USERS=
`

const cloneFrontendPath = "https://github.com/ryzzan/kunlatek-quickstart";

const cloneBackendPath = "https://github.com/kunlabori-teknologio/quickstart-api";

const projectPath = "/home/ryzzan/Projects/esprimi-backoffice";

/**
 * ANIMATION
 */
// import { ANIMATION_FORM } from "../collections-frontend/example/animation-form";
// import { ANIMATION_TABLE } from "../collections-frontend/example/animation-table";
// import { ANIMATION } from "../collections-frontend/example/animation";

// import { CHARACTER_FORM } from "../collections-frontend/example/character-form";
// import { CHARACTER_TABLE } from "../collections-frontend/example/character-table";
// import { CHARACTER } from "../collections-frontend/example/character";


/**
 * GENERIC TEST
 */
// import {USER_GROUP_FORM} from "../collections-frontend/generic-test/user-group-form";
// import {USER_GROUP_TABLE} from "../collections-frontend/generic-test/user-group-table";
// import {USER_GROUP} from "../collections-frontend/generic-test/user-group";

// import {PERMISSION_GROUP_FORM} from "../collections-frontend/generic-test/permission-group-form";
// import {PERMISSION_GROUP_TABLE} from "../collections-frontend/generic-test/permission-group-table";
// import {PERMISSION_GROUP} from "../collections-frontend/generic-test/permission-group";

/**
 * CLIENTS
 */
import { PROJECT } from "../collections-frontend/kunlatek/esprimi-backoffice/project";
import { PROJECT_FORM } from "../collections-frontend/kunlatek/esprimi-backoffice/project-form";
import { PROJECT_TABLE } from "../collections-frontend/kunlatek/esprimi-backoffice/project-table";

import { MODULE } from "../collections-frontend/kunlatek/esprimi-backoffice/module";
import { MODULE_FORM } from "../collections-frontend/kunlatek/esprimi-backoffice/module-form";
import { MODULE_TABLE } from "../collections-frontend/kunlatek/esprimi-backoffice/module-table";

// TO-DO: FINANCIAL REPORT
//////////////////////////////////////////////////////////
const main = new Main(),
    array = [
        /**
         * ANIMATION
         */
        // ANIMATION_FORM, ANIMATION_TABLE, ANIMATION,
        // CHARACTER_FORM, CHARACTER_TABLE, CHARACTER,

        /**
         * GENERIC TEST
         */
        // USER_GROUP_FORM, USER_GROUP_TABLE, USER_GROUP,
        // PERMISSION_GROUP_FORM, PERMISSION_GROUP_TABLE, PERMISSION_GROUP,

        /**
         * CLIENT
         */
        PROJECT_FORM, PROJECT_TABLE, PROJECT,
        MODULE_FORM, MODULE_TABLE, MODULE,
    ];

array.forEach(object => {
    object.projectPath = projectPath;
    object.cloneFrontendPath = cloneFrontendPath;
    object.cloneBackendPath = cloneBackendPath;
    object.envFrontendDev = envFrontDev;
    object.envFrontendProd = envFrontProd;
    object.envBackend = envBackend;
});

main.createCode(array)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    });