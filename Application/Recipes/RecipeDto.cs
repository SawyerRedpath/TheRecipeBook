using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Recipes {
    public class RecipeDto {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Source { get; set; }

        public string Url { get; set; }

        public string Notes { get; set; }

        public string PrepTime { get; set; }

        public string CookTime { get; set; }

        public bool IsPrivate { get; set; }

        [JsonPropertyName ("followers")]
        public ICollection<FollowerDto> UserRecipes { get; set; }
    }
}