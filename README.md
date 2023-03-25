# World Zero

This is a revamping of the old site <a href="http://sf0.org/" target="_blank">SF0</a>.

SF0 was a collaborative game played in the real world. Users could add tasks for themselves and others to complete to gain points, such as, "Acquire a small potted plant. Leave the plant in a store, cafe, or a location of your choosing that has lack of potted plants." When completing a task, a user would have to supply evidence that they really did it, via photos or other means.

## Live Site

The live site is currently hosted <a href="https://world-zero.vercel.app/">here</a>. I'm adding pages and updates constantly, so check back soon!

Eventually, the site will have a lovely whimsical design I made in Canva, but coding it will be quite unusual and involved. For now it will look very basic to get the essentially functionality and features in place.

## Planned Features

- Fully responsive
- Light/dark mode
- Secure signup + login for users
- Users can join groups
- Users can add other users as friends or foes
- Users can create tasks that others can take on
- All tasks can be searched and filtered
- Users can mark tasks as accomplished to gain points
- Points will grant special privileges
- Users can comment on tasks, task completions, and other users' profiles with rich text, including images in some cases
- When not logged in, home starts with About info; when logged in, shows recent updates for user, such as activity by their friends/foes and comments on their tasks/profile
- Plan to make it screen reader accessible once basic functionality is done

## Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![DrawSQL](https://img.shields.io/static/v1?label=&message=drawSQL&color=6366f1&style=for-the-badge)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white)

## References

- <a href="https://www.uxmatters.com/mt/archives/2020/07/designing-mobile-tables.php">UX Matters: Designing Mobile Tables</a>
- <a href="https://www.softwaretestinghelp.com/login-page-test-cases/">Login Page Test Cases</a>

## To-Do List

1. Finish designing users table in DrawSQL
2. Connect to RDS with MySQL Workbench
3. Add just users to RDS for now

4. Add RDS info to project .env and check tables access
5. Write frontend queries & backend responses to frontend queries
6. Deploy backend on AWS Elastic Beanstalk
7. Connect Vercel frontend to Beanstalk backend
8. Test user creation
9. Add Jest testing for user account creation, login, & logout
10. Add remaining tables to RDS, relevant queries, & test
11. Continue designing frontend
