# @astraljaeger/bundle-action

A simple GitHub Action which uses a `.bundleinclude` file to create zip bundles. Originally I created this action to
build release packages for my university assignments, having them built on GitHub by a workflow and then create a
release was much less hassle than to do it manually on my machine. This comes form the nature of assignments where you
had already uploaded your 'final' version and then get informed but fellow students you messed something up, but really?
rebuild then entire project, documentation, rebundle and resubmit? Just use a workflow instead! Change the assignment,
git commit, git push, wait and have a convenient .zip created for you!

## How to use

```yaml
  - name: Install Node.js
    uses: astraljaeger/bundle-action@v1
    with:
      bundleignore: .bundleignore
      bundle: ./bundle.zip
      overrideExisting: true # optional
```

```gitignore
**/*.pdf
images/*.png
```
