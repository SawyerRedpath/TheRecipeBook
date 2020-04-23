using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.List
{
    public class List
    {
        public class Query : IRequest<List<RecipeDto>> { }

        public class Handler : IRequestHandler<Query, List<RecipeDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<RecipeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var recipes = await _context.Recipes
                    .ToListAsync();

                return _mapper.Map<List<Recipe>, List<RecipeDto>>(recipes);
            }
        }
    }
}