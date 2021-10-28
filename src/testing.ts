import { Main } from './index';

import { EXAMPLE_WITHOUT_TABS_FORM } from '../collections-frontend/example-without-tabs-form';
import { EXAMPLE_WITH_TABS_FORM } from '../collections-frontend/example-with-tabs-form';
import { EXAMPLE_TABLE } from '../collections-frontend/example-table';
import { EXAMPLE } from '../collections-frontend/example';

// import { APPLICATION_FORM } from '../collections-frontend/admin-module/application-form';
// import { APPLICATION_TABLE } from '../collections-frontend/admin-module/application-table';
// import { APPLICATION } from '../collections-frontend/admin-module/application';
// import { MODULE_FORM } from '../collections-frontend/admin-module/module-form';
// import { MODULE_TABLE } from '../collections-frontend/admin-module/module-table';
// import { PERMISSION_GROUP_FORM } from '../collections-frontend/admin-module/permission-group-form';
// import { PERMISSION_GROUP_TABLE } from '../collections-frontend/admin-module/permission-group-table';
// import { PERMISSION_GROUP_MODEL_FORM } from '../collections-frontend/admin-module/permission-group-model-form';
// import { PERMISSION_GROUP_MODEL_TABLE } from '../collections-frontend/admin-module/permission-group-model-table';
// import { USER_GROUP_FORM } from '../collections-frontend/admin-module/user-group-form';
// import {  } from '../collections-frontend/admin-module/user-group-table';


//////////////////////////////////////////////////////////
const main = new Main(),
array = [
    EXAMPLE_WITHOUT_TABS_FORM, EXAMPLE_TABLE, EXAMPLE
];


array.forEach(object => {
    object.projectPath = '/home/ryzzan/Projects/Angular/test-esprimi';
    
    console.log(main.createCode(object));    
});