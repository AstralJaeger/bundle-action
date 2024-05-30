# astraljaeger/bundle-action

A simple GitHub Action uses a `.bundleinclude` file to create zip bundles. I originally created this action to build
release packages for my university assignments. Having them built on GitHub by a workflow and then creating a release
was much less hassle than doing it manually on my machine.

Assignments often go like this: you upload your 'final' version, only to be informed by fellow students that you messed
something up. Do you really have to rebuild the entire project, update the documentation, rebundle, and resubmit? Nah,
just use a workflow instead! Make changes to the assignment, commit them to git, push, and wait for a convenient .zip to
be created for you!

## How to use

```yaml
- name: Create bundle
  uses: astraljaeger/bundle-action@v1
  with:
    bundleignore: .bundleignore
    bundle: ./bundle.zip
    overrideExisting: true # optional
```

```gitignore
# pdf files
**/*.pdf

# images
images/*.png
```

## Bundleinclude:

Each line of the bundle includepattern is handled as a glob pattern. Lines starting with # will also be ignored and
treated as comments.

The action uses the [glob package](https://www.npmjs.com/package/glob) to match files.

```bundleinclude
# pdf files
**/*.pdf

# images
images/*.png

# assets
assets/*
```
