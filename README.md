<h1>A tool for providing absolute assistance to students and teachers</h1>
<h2>DinoPig</h2>
<h2>API Guidelines</h2>
<ul>
    <li>
        Use "npm run dev" to run both back-end and front-end resource
    </li>
    <li> Use "npm run server" to run only back-end</li>
    <li>Use "npm run client" to run only front-end</li>
</ul>
<h3>User Methods</h3>
    <ul>
        <li>GET "/users": return all users</li>
        <li>POST "/users": register user including: username, name, email, password, phone_number, role</li>
        <li>POST "/users/login": Request username and password</li>
        <li>GET "/users/about": About User's API</li>
    </ul>