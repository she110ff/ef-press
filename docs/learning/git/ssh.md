# SSH key 

## Generate a new SSH Key
```bash
git remote set-url origin git@github.com:username/repo.git
```
```bash
ssh-keygen -t rsa -b 4096 -C "user@email.com"  
...
> Your identification has been saved in C:\Users\user/.ssh/id_rsa
> Your public key has been saved in C:\Users\user/.ssh/id_rsa.pub
> ...
```

## Add a new SSH key to your Git

```bash
cat C:\Users\user/.ssh/id_rsa.pub
ssh-rsa AAAAB3Nza ....... rcP4w== user@email.com  # copy this
```

[Adding a new SSH key to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)