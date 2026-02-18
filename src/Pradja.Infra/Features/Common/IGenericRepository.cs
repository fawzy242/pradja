using System.Data;
using Pradja.Domain.Common.Queries;

namespace Pradja.Infra.Features.Common
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(IdQuery query);
        Task<object> InsertAsync(T entity);
        Task<int> UpdateAsync(T entity);
        Task<int> DeleteAsync(object id);
        Task<IEnumerable<T>> QueryAsync(string sql, object? parameters = null);
        Task<TResult> QuerySingleAsync<TResult>(string sql, object? parameters = null);
    }
}