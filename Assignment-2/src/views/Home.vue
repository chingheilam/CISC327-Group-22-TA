<template>
  <div>
    <h1>HomePage</h1>
    <p>Temporarily homepage</p>

    <nav>
      <ul>
        <li>
          <router-link to="/userpage">User Page</router-link>
        </li>
        <li>
          <router-link to="/login">Login Page</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
