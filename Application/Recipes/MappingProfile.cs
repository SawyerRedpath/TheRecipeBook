using AutoMapper;
using Domain;

namespace Application.Recipes {
    public class MappingProfile : Profile {
        public MappingProfile () {
            CreateMap<Recipe, RecipeDto> ();
            CreateMap<UserRecipe, FollowerDto> ()
                .ForMember (d => d.Username, o => o.MapFrom (s => s.AppUser.UserName))
                .ForMember (d => d.DisplayName, o => o.MapFrom (s => s.AppUser.DisplayName));
        }
    }
}