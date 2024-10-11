export const ADD_ONE_UPLOAD = `
mutation CreateOneUpload(
$filePath: String!, 
$fileData: String!, 
$title: String!, 
$message: String!, 
$senderEmail: String!, 
$receiversEmails: [String!]!) 
{
  createUpload(
  filePath: $filePath, 
  fileData: $fileData, 
  title: $title, 
  message: $message, 
  senderEmail: $senderEmail, 
  receiversEmails: $receiversEmails)
}
`;
