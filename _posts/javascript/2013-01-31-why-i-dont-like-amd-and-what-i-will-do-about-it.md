---
layout: post
title: "Why I Don't Like AMD And What I Will Do About It"
description: "Defining the dependencies of your files is more than a requirement for a large scale project. There simply is no other way you can accomplish maintainability and collaboration between teams. However i beg to differ from calling everything a module and certainly i am not fond of AMD and its' derivatives."
category : javascript
tags : [javascript, requirejs, amd, modules, dependencies, google closure]
shortUrl: http://than.pol.as/MbPR
---
{% include JB/setup %}

Today I saw [a tweet][tweet] from [@addyosmani][] talking about why you need *Require.js*:

> If you're still having challenges understanding the need for Require.js, the community have you covered [https://gist.github.com/4686136](https://gist.github.com/4686136) :)

## About AMD Modules and Require.js
Defining the dependencies of your files is more than a requirement for a large scale project. There simply is no other way you can accomplish maintainability and collaboration between teams.

However i beg to differ from calling everything a module and certainly i am not fond of AMD and its' derivatives.  I am a fan of namespaced applications, it's a choice. There's no right or wrong there.

In regards to [Require.js][] specifically, i have stated time and again I am not a big fan. It is a very good effort in trying to solve the dependency problem, it's wildly popular and afaik it's the only package that JS developers go to when talking about dependency management.

My main concern with Require.js is that in trying to serve all the needs and requirements out there it has become a very complex and hard to work with package. Especially when trying to test the modules, [mocking and stubbing the requirements can be a huge pain][squire].

From there on, everything else has to do with the [Asynchronous Module Definition][amd] pattern that Require.js and the other packages rely or are based on.

There are 3 reasons for that.

### AMD Is Not Focused On Solving Dependencies

It is also a way of defining how your code will be structured by forcing you to wrap it in a huge anonymous function, called the factory:

{% highlight javascript %}
define(id?, dependencies?, factory);
{% endhighlight %}

Some people like this style some people don't. The main reasoning being that you don't want to leak variables to the global namespace. I understand that but the AMD pattern is not the only way to avoid global namespace pollution.

### AMD Creates Closures For Each File

Since the definition of AMD requires that you wrap your code in an anonymous function this results in creating one extra closure for every file in your codebase.

We all are knowledgeable folks here and know what this means or doesn't mean.

### AMD creates verbosity that's not required on production

The declaration / requirement statements are there in production code.

Whatever you state that each file requires on the top of your module, will be there in the production code. If AMD was a purely dependency management solution this should not happen. It should plainly make sure that the files are concatenated in the right order based on their dependencies and get out of the way after that.

You are sending over the wire ~1-3% more bytes, from what your JS app size is. That is too much.


## What I Plan On Doing About it

[Google's Closure dependency][depswriter] system is the most elegant solution i know by far. It does what it says it does, takes care of your dependencies, nothing more, nothing less and it does it very very well.

It can be ripped of the closure tools and used independently on any kind of project. It's what i plan on doing pretty soon, as soon as i find a free weekend.

It doesn't dictate how you write your code. You want namespaced hierarchy? Cool! You want AMD modules? Certainly! You want something in between? Can do... no restrictions

And closure compiler in SIMPLE_OPTIMIZATIONS will take care and remove all the dependency statements from your production code leaving it bare as it should be.

---

**Update 25 Feb, 2013** The solution is now ready. Check out [Mantri][] and read about the [announcement blog post][mantri-post].

[depswriter]: https://developers.google.com/closure/library/docs/depswriter "Google closure dependency management"
[@addyosmani]: https://twitter.com/addyosmani "Addy Osmani - Googler working on chrome"
[tweet]: https://twitter.com/addyosmani/status/297251937219379200 "Addy Osmani's tweet about requireJS"
[Require.js]: http://requirejs.org/ "RequireJS is a JavaScript file and module loader."
[squire]: https://github.com/iammerrick/Squire.js/issues/16 "Squire.js Issue #16: Cannot properly test modules that export a constructor"
[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD "Wikipedia :: The Asynchronous Module Definition (**AMD**) API"
[mantri-post]: http://thanpol.as/javascript/announcing-the-release-of-mantri/ "Announcing the release of mantri"
[mantri]: https://github.com/thanpolas/mantri "Mantri - Traditionaλ Dependency System"
