# Authentication In Next.js

This is an example site to implement authentication support to your Next.js application without library SDK  
It can be found at https://next-auth-example-psi.vercel.app

## Features

- Signing in
- Signing out
- Loading the user on the client side
- Loading the user on the server side
- Protected page

## Use case

### Get session information

```jsx
import {useSession} from 'core/authenticated';

const MyComponent = () => {
  const session = useSession();

  return <div>{session?.me.email}</div>;
};
```

### Render session on server-side

```ts
import {withAuth} from 'core/authenticated';

export const getServerSideProps = withAuth.getServerSideProps({
  isProtected: false, // <== HERE
})(async context => {
  return {
    props: {},
  };
});
```

### To protected of pages

```ts
import {withAuth} from 'core/authenticated';

export const getServerSideProps = withAuth.getServerSideProps({
  isProtected: true, // <== HERE
})(async context => {
  return {
    props: {},
  };
});
```

## Alternatives

- [NextAuth.js] (https://github.com/nextauthjs/next-auth)
- [Auth0] (https://github.com/auth0/nextjs-auth0)
