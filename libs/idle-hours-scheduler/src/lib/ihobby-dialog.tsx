// import { FieldArray, Form, Formik } from 'formik';
// import React from 'react';
// import { useRecoilState } from 'recoil';
// import {
//   frequencies,
//   HobbyConfiguration,
//   HobbyTag,
//   hobbyTags,
//   priorities,
//   UserHobbyConfigurations,
// } from './idle-hours-interfaces';
// import { selectedUserHobbies } from './idle-hours.state';
// import * as yup from 'yup';

// const hobbyConfigSchema = yup.object().shape({
//   hobby: yup.string().required().ensure().oneOf(hobbyTags),
//   priority: yup.string().required().ensure().oneOf(priorities),
//   frequency: yup.string().required().ensure().oneOf(frequencies),
//   hourGoal: yup.number().required(),
// });
// const hobbyConfigDialogSchema = yup
//   .object()
//   .shape({ hobbies: yup.array().of(hobbyConfigSchema) });

// export const HobbyConfigurationDialog = ({ isOpen }: { isOpen: boolean }) => {
//   const [currentUserHobbyConfig, setCurrentUserHobbyConfig] =
//     useRecoilState<UserHobbyConfigurations[]>(selectedUserHobbies);
//   const onSubmit = (values: UserHobbyConfigurations) => {
//     setCurrentUserHobbyConfig(values.hobbies);
//   };
//   return (
//     <Formik<UserHobbyConfigurations>
//       initialValues={{ hobbies: currentUserHobbyConfig }}
//       validationSchema={hobbyConfigDialogSchema}
//       onSubmit={onSubmit}
//     >
//       <Form>
//         <FieldArray name="hobbies" render={(arrayHelpers) => <div></div>} />
//       </Form>
//     </Formik>
//   );
// };
