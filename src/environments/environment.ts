const backendURL = "http://localhost:8080/EduLearn/";
export const environment = {
  production: false,
  snackDuration: 3000,
  idleTimeInSeconds: 900,
  timeOutInSeconds: 10,
  keepAliveIntervalInSeconds: 300,
  
  organizationDetails: backendURL + "OrganizationDetails/",
  organizationType: backendURL + "organizationTypeController/",
  organizationStream:backendURL+"organizationStream/",
  facilityDetails: backendURL + "facility/",
  organizationCourse:backendURL+"organizationCourseController/",
  organizationAmenities:backendURL+"organizationAmenitiesController/",
  boardDetails: backendURL + "baordMst/",
  userController:backendURL + "userController/",

}