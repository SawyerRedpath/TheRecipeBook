using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes
{
    public class Details
    {
        public class Query : IRequest<Recipe>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Recipe>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Recipe> Handle(Query request, CancellationToken cancellationToken)
            {
                var recipe = await _context.Recipes.FindAsync(request.Id);

                if (recipe == null) throw new RestException(HttpStatusCode.NotFound, new { Recipe = "Not found" });

                return recipe;
            }
        }
    }
}