const generateMessage = (entity: string) => ({
  alreadyExist: `${entity} Already Exist`,
  notFound: `${entity} Not Found`,
  failToCreate: `Fail To Create ${entity}`,
  failToUpdate: `Fail To Update ${entity}`,
  failToDelete: `Fail To Delete ${entity}`,
  createdSuccessfully: `${entity} Created Successfully`,
  updateSuccessfully: `${entity} Updated Successfully`,
  deleteSuccessfully: `${entity} Deleted Successfully`,
  notAllowed: `${entity} Not Authorized To Access This Api`,
  verifiedSuccessfully: `${entity} Verified Successfully`,
  archivedSuccessfully: `${entity} Archived Successfully`,
  restoredSuccessfully: `${entity} Restored Successfully`,
});

export const messages = {
  user: {
    ...generateMessage('User'),
    verified: 'User Verified Successfully',
    notAuthorized: 'Not Authorized To Access This Api',
    invalidCredential: 'Something Wrong In Password',
    changePassword: 'Password Changed Successfully',
    AlreadyHasOtp: 'You Already Has OTP',
    checkEmail: 'Check Your Email',
    invalidOTP: 'Invalid OTP',
    expireOTP: 'OTP Is Expired',
    login: 'Congratulation Please Login',
    loginSuccessfully: 'User Login Successfully',
    incorrect: 'Incorrect Email Or Password',
    alreadyVerified: 'You Already Verified',
  },

  category: generateMessage('Category'),
    product: { ...generateMessage("Product"), outStock: "Out Of Stock",lessThan: "Must Be Less Than 100" },

};