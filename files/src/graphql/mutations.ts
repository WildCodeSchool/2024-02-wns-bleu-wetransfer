export const ADD_ONE_UPLOAD = `
  mutation CreateOneUpload(
    $fileStoragePath: String!, 
    $senderEmail: String!, 
    $title: String!, 
    $message: String!, 
    $receiversEmails: [String]!, 
    $fileData: Float!
  ) {
    createUpload(
      file_path: $fileStoragePath, 
      senderEmail: $senderEmail, 
      title: $title, 
      message: $message, 
      receiversEmails: $receiversEmails, 
      fileData: $fileData
    )
  }
`;
