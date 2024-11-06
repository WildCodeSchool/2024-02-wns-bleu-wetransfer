export const ADD_ONE_UPLOAD = `
mutation CreateOneUpload(
$fileData: String!, 
$title: String!, 
$message: String!, 
$senderEmail: String!, 
$receiversEmails: [String!]!) 
{
  createUpload(
  fileData: $fileData, 
  title: $title, 
  message: $message, 
  senderEmail: $senderEmail, 
  receiversEmails: $receiversEmails)
}
`;
