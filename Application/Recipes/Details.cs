using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes
{
    public class Details
    {
        public class Query : IRequest<RecipeDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, RecipeDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<RecipeDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var recipe = await _context.Recipes
                    .FindAsync(request.Id);

                if (recipe == null) throw new RestException(HttpStatusCode.NotFound, new { Recipe = "Not found" });

                var recipeToReturn = _mapper.Map<Recipe, RecipeDto>(recipe);

                return recipeToReturn;
            }
        }
    }
}