using Core.Interfaces.Services;
using Core.Models;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EasyClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ExaminationsController : ControllerBase
    {
        private readonly IExaminationService _service;
        public ExaminationsController(IExaminationService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetExaminationsAsync()
        {
            IEnumerable<Examination> examinations = await _service.GetExaminations();

            return Ok(examinations);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Examination exam)
        {


            int id = await _service.CreateExamination(exam);

                return Created(default(string), id);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Examination exam)
        {

            await _service.UpdateExamination(exam);
                return Ok(exam);
        }
    }
}
