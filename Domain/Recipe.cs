using System;
using System.Collections.Generic;

namespace Domain
{
    public class Recipe
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Source { get; set; }

        public string Url { get; set; }

        public string Notes { get; set; }

        public string PrepTime { get; set; }

        public string CookTime { get; set; }

        public bool IsPrivate { get; set; }

        public virtual ICollection<UserRecipe> UserRecipes { get; set; }
    }
}