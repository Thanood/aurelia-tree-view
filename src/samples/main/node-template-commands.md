# Binding template model properties

One problem with binding a template model is the fact that it's initialized only
once. So if you change the model, the nodes don't get updated.

In this example we're using commands set asynchronously by the parent view model
to show how this works.
