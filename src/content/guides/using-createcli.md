---
title: "Using our CreateCLI"
description: "A guide to using our CreateCLI to create a new VTuber page."
pubDate: 2024-03-19
author: 0xyami
---

## Introduction

Are you ready to showcase your VTuber persona on The Vtuber Wiki? This guide, tailored for individuals with no prior experience in GitHub or programming, will walk you through the process step by step.

<details><summary>Prerequisites</summary>

Before embarking on the journey to create your VTuber profile on The Vtuber Wiki, let's ensure you have everything you need. Here are the prerequisites for a smooth experience, even if you have no prior experience with GitHub or programming:

1. GitHub Account:
    - If you don't have a GitHub account, [create one](https://github.com/join). This account will be your gateway to managing and contributing to your VTuber page.

    Learn: [Create a GitHub Account](#create-a-github-account)

2. Basic Understanding of Markdown:

    - Familiarize yourself with basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) since your VTuber profile will be written in this lightweight markup language.

3. Access to Git:

    - Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your local machine. Git is the version control system that helps you manage your code changes.

    Learn: [Learn Git](#learn-to-use-git)

4. Text Editor:

    - Choose a text editor for editing your Markdown files. If you don't have a preferred one, [Visual Studio Code](https://code.visualstudio.com/) is a popular and user-friendly choice.

Now that you've gathered the essentials, you're ready to dive into creating your VTuber profile. Follow the step-by-step guide provided earlier, and don't hesitate to refer back to this section if needed.

</details>

<br />

## Essential Details

When creating your VTuber page, it's crucial to include the following key information:

- `Name`: Your VTuber's name.
- `Description`: A concise overview of your VTuber persona.
- `Author`: Your name or username (GitHub).
- `Is a draft`: Set to `true` if you're still working on your VTuber page.
- `Banner Image`: A URL link to your banner image.
- `Avatar Image`: URL link to your VTuber avatar.
- `Border Color`: The color for your VTuber's profile card.
- `Links`: Relevant URLs, such as Discord server, social media profiles, and streaming platform.

## Using CreateCLI

The Vtuber Wiki provides a command-line interface (CLI) tool, CreateCLI, to help you create a new VTuber page with ease. Here's how you can use it:

1. **Clone the Repository**:

First, clone the repository to your local machine using the following command:

```bash 
    git clone https://git.vtubers.wiki/wiki
```

2. **Navigate to the Directory**:
    
Change your working directory to the `wiki` folder:
    
```bash
  cd wiki
```

3. **Install Dependencies**:

Install the dependencies required for CreateCLI:

```bash
  npm run iall # This command will install all dependencies required for the main project and any scripts.
```

4. **Run CreateCLI**:

Run the CreateCLI tool to create a new VTuber page:

```bash
  npm run create
```

5. **Follow the Prompts**:

The CreateCLI tool will prompt you to enter the essential details for your VTuber page. Follow the prompts to provide the required information.


## Learn to Use Git

Git is a version control system that helps you manage your code changes. Here's a basic overview of how to use Git:

1. **Clone a Repository**:

To get started, you'll need to clone the repository to your local machine. Use the following command:

```bash 
git clone <repository_URL>
```

Replace `<repository_URL>` with the URL of the repository you want to clone.

2. **Navigate to the Directory**:

Once the repository is cloned, navigate to the directory of the repository:

```bash
cd <repository_directory>
```
___

3. **Commit Changes**:

After making changes to your files, you'll need to commit those changes to Git. First, add the files you want to commit:

```bash
git add <file_name>
```

Replace `<file_name>` with the name of the file you want to add. You can also use `.` to add all changed files.

Next, commit the changes:

```bash
git commit -m "feat: Add new feature

Add a descriptive message about the changes you made."
```

> Note: Replace `feat: Add new feature` with the type of change you made (e.g., `fix`, `docs`, `style`, `refactor`, etc.), and replace the message with a descriptive summary of the changes. Learn: [Commit Message Conventions](https://www.conventionalcommits.org/en/v1.0.0/)

___

4. **Push Changes**:

Once your changes are committed, you can push them to the remote repository:

```bash
git push
```

This will push your changes to the default remote repository.

___


5. **Pull Changes**:

If there are changes in the remote repository that you don't have locally, you can pull them:

```bash
git pull
```

This will fetch the changes from the remote repository and merge them into your local branch.

___

6. **Remove Files from Commits**:

If you accidentally added a file to a commit that you don't want to include, you can unstage it:

```bash
git reset HEAD <file_name>
```

Replace `<file_name>` with the name of the file you want to unstage.

These are the basic Git commands to get you started. As you become more familiar with Git, you can explore more advanced features and workflows.


## Create a GitHub Account

If you don't already have a GitHub account, follow these steps:

1. **Go to GitHub**: Visit [github.com](https://github.com/join) and click on "Sign up."

2. **Fill Out the Form**: Enter your desired username, email address, and password.

3. **Verify Your Email**: GitHub will send you an email to verify your email address. Click on the link in the email to complete the verification process.

4. **Choose Your Plan**: GitHub offers both free and paid plans. For most users, the free plan is sufficient. Select the free plan and continue.

5. **Welcome to GitHub!**: Once you've completed the signup process, you'll be redirected to your GitHub dashboard. You're now ready to start using GitHub!