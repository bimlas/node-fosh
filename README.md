# Fosh: Execute shell commands in multiple directories grouped by tags

For developers who **running the same command in different directories**
repeatedly, Fosh is a productivity tool that saves time by **executing the
command without having to change the directory**. Unlike other similar tools,
Fosh does not bound to a certain software (like Git for example), it can
**execute any shell command**. **It works at least on Windows and Linux
regardless of shell type**.

![screencast](https://i.imgur.com/ZbCUxNS.gif)

**If you prefer Bash, have a look at https://github.com/bimlas/bash-mosh/**

* **Manage multiple Git repositors together**
  * `push` and `pull` all of your repos at once
  * Checkout the same branch for project and its submodules
  * Commit with the same message: walk through the repos without
    interruption and copy / paste the same commit message
  * Prevent early push: you do not have to remember which repositories have
    modified, just look at them at the end of the day to see where you need to
    push
* **Control multiple vagrant machines at the same time**

The essence of the logic in a nutshell:

```
for(dir in selectedDirectories) {
  cd(dir);
  shellCommand();
}
```

This also means the name: `for ... shell ...` -> `fosh`.

## Installation

```
$ npm install -g fosh
```

https://www.npmjs.com/package/fosh

Get the source code, report bugs, open pull requests, or just star because
you didn't know that you need it:

* https://gitlab.com/bimlas/node-fosh (official repository)
* https://github.com/bimlas/node-fosh (mirror, star if you like it)

## Commands

### Tag: Assign tags to directories

The tags can be specified as command-line parameters prefixed with `@`,
directories should be listed in the prompt, or piped to stdin.

```
$ fosh tag "@pictures" "@personal"
fosh: tag > /home/myself/photos
fosh: tag > /home/mom/my_little_family
fosh: tag > ../granny

$ echo -e "/home/myself/photos \n /home/mom/my_little_family \n ../granny" | fosh tag "@pictures" "@personal"
```

#### Find Git repositories

**Tagging Git repositories** under the current directory (`./`) with
"git-repos" tag:

```
# Linux / Windows Git Bash / ...
$ find "./" -name ".git" -printf "%h\n" | fosh tag "@git-repos"

# Windows PowerShell
$ Get-ChildItem './' -Recurse -Directory -Hidden -Filter '.git' | ForEach-Object { Split-Path $_.FullName -Parent } | fosh tag '@git-repos'
```

**On Windows you can use Everything search engine's `es` [command-line
interface](https://www.voidtools.com/support/everything/command_line_interface/)
to find Git repositories rapidly**. Use the following command in PowerShell
for this (omit the path of the root directory (`./src`) to find everywhere):

```
$ es -regex '^\.git$' './src' | Split-Path -Parent | fosh tag '@git-repos'
```

### List: Prints the path of the tag list file

You can edit it in a texteditor (Notepad, Vim, etc.).

### Run: Execute commands in multiple directories

Arguments can be tags and paths.

```
$ fosh run "@git-repos" "../wip-project"
fosh: run > git status --short --branch

__ @1 awesome-project (/home/me/src/) ________________________________________
## master
AM README.md
 M package.json

__ @2 git-test (/home/me/src/) _______________________________________________
## master...origin/master
 M README.adoc
 M encoding/cp1250-encoding-dos-eol.txt
 M encoding/dos-eol.txt

__ @3 wip-project (/home/me/helping-tom/) ____________________________________
## master...origin/master
 M example-code.js

==============================================================================
fosh: run > another command and so on ...
```

#### Filtering the directory list

If you want to **execute a command only in certain directories**, you can
select them by their index.

```
fosh: run > @1,3 git status --short --branch

__ @1 awesome-project (/home/me/src/) ________________________________________
## master
AM README.md
 M package.json

__ @3 wip-project (/home/me/helping-tom/) ____________________________________
## master...origin/master
 M example-code.js
```

#### Execute in the most recently used directories

**This is useful if the output is long** and you want to execute additional
commands on certain directories. In this case, open a new terminal window (so
you can look back at results in the current terminal) and run the program
without arguments: the directory list is always stored when tag or directory
arguments are given, but if you run it without arguments, it executes the
commands on the last specified directories.

```
$ fosh run "@git-repos" "../wip-project"
fosh: run > git status --short --branch

__ @1 awesome-project (/home/me/src/) ________________________________________
## master
AM README.md
...

# Another terminal

$ fosh run
fosh: WARNING: Using most recently used directory list
fosh: run > @3 git diff

__ @3 wip-project (/home/me/helping-tom/) ____________________________________
 example-code.js | 1 +
 1 file changed, 1 insertion(+)

diff --git a/example-code.js b/example-code.js
index 12b5e40..733220f 100644
--- a/example-code.js
+++ b/example-code.js
...
```

## FAQ

### I use MinTTY on Windows and XY don't work or work differently

Under [MinTTY](https://mintty.github.io/) (default terminal emulator of Git
for Windows), it is not possible to identify exactly that `stdin` is a
terminal or pipe (see https://duckduckgo.com/?q=MinTTY+is+not+a+TTY), so
some things may work differently than in other terminals. Try using another
terminal like system default, your IDE's builtin terminal,
[Conemu](https://conemu.github.io/),
[Alacritty](https://github.com/jwilm/alacritty).

## Similar projects

* https://github.com/joowani/dtags
* https://github.com/coderaiser/node-longrun
* https://github.com/MamadouSy/fed
* https://github.com/isacikgoz/gitbatch
