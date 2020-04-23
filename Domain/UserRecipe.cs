using System;

namespace Domain
{
    public class UserRecipe
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public Guid RecipeId { get; set; }

        public virtual Recipe Recipe { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsCreator { get; set; }
    }
}