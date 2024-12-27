<script>
	import "../app.css";
  </script>
  
  <nav>
	<a href="/">Home</a>
	<a href="/posts">Posts</a>
  </nav>
  
  <slot />
  
  <style>
	nav {
	  display: flex;
	  gap: 1rem;
	  background-color: #f3f4f6;
	  padding: 1rem;
	  border-bottom: 1px solid #ddd;
	}
  
	nav a {
	  text-decoration: none;
	  color: #4f46e5;
	  font-weight: bold;
	}
  
	nav a:hover {
	  text-decoration: underline;
	}
  </style>
  