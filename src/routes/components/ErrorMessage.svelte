<script>
    export let message = 'An error occurred.';
  </script>
  
  <div class="error-message">
    <p>{message}</p>
  </div>
  
  <style>
    .error-message {
      color: #d32f2f;
      background-color: #ffebee;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      margin: 20px 0;
      font-weight: bold;
    }
  </style>  