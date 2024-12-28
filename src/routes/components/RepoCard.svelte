<script>
    export let repo;
  </script>
  
  <div class="repo-card">
    <img src="{repo.avatar || '/static/placeholder.png'}" alt="{repo.name} Avatar" class="repo-avatar" />
    <div class="repo-details">
      <h3 class="repo-title">{repo.name}</h3>
      <p class="repo-description">{repo.description || 'No description available'}</p>
      <div class="repo-stats">
        <span>⭐ {repo.stars || '0'}</span>
        <span>🍴 {repo.forks || '0'}</span>
        <span>🛠️ {repo.language || 'Not Listed'}</span>
        <span>📋 {repo.openIssues || 'No Issues'}</span>
        <span>🤝 {repo.contributors || 'No Contributors'}</span>
      </div>
    </div>
    <div class="view-repo-container">
      <a href="{repo.url}" target="_blank" class="view-repo">View Repository</a>
    </div>
  </div>
  
  <style>
    .repo-card {
      background: linear-gradient(145deg, #ffffff, #f3f4f6);
      border-radius: 16px;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.9);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      padding-bottom: 20px;
      height: 100%; /* Uniform card height */
    }
  
    .repo-card:hover {
      transform: translateY(-5px);
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8);
    }
  
    .repo-avatar {
      width: 100%;
      height: 150px;
      object-fit: cover;
      margin-bottom: 10px; /* Ensure spacing below the image */
    }
  
    .repo-details {
      flex: 1; /* Ensures the details section fills available space */
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .repo-title {
      font-size: 18px;
      font-weight: bold;
      color: #111827;
      text-align: center;
    }
  
    .repo-description {
      font-size: 14px;
      color: #4b5563;
      max-height: 60px; /* Truncate long descriptions */
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .repo-stats {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #4b5563;
    }
  
    .view-repo-container {
      display: flex;
      justify-content: center; /* Center the button */
      margin-top: 20px; /* Ensure consistent spacing */
    }
  
    .view-repo {
      text-align: center;
      background-color: #3b82f6;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.2s ease-in-out, transform 0.2s;
    }
  
    .view-repo:hover {
      background-color: #2563eb;
      transform: translateY(-2px); /* Subtle hover lift effect */
    }
  </style>  