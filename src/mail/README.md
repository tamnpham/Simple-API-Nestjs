To use mail functions we use Nodemailer package to implement. If we want to use any package we need to notice two things about the package: 'import module' and 'import service of that module'.

In configurations of mail module, if we config hardcoded into our code file we will find difficultly when we want to change. Therefore, we need to concentrate that configurations as variable environment (such as .env) to easily change and control

NOTE: if we use gmail to send email we must to enable 'Less secure app access' in gmail account setting to allow our application can access our account. Otherwise, the connection to login gmail server will be failed.

# References
https://notiz.dev/blog/send-emails-with-nestjs