using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Recipes
{
    public class Follow
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public IUserAccessor UserAccessor { get; }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var recipe = await _context.Recipes.FindAsync(request.Id);

                if (recipe == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Recipe = "Could not find Recipe" });

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());

                var following = await _context.UserRecipes
                .SingleOrDefaultAsync(x =>
                x.RecipeId == recipe.Id &&
                x.AppUserId == user.Id);

                if (following != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { Recipe = "Already following this Recipe" });

                if (recipe.IsPrivate)
                    throw new RestException(HttpStatusCode.BadRequest, new { Recipe = "This Recipe is private" });

                following = new UserRecipe
                {
                    Recipe = recipe,
                    AppUser = user,
                    IsCreator = false,
                    DateAdded = DateTime.Now
                };

                _context.UserRecipes.Add(following);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}