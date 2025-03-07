﻿using Core.Interfaces.Services;
using Core.Models;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EasyClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _service;

        public PatientsController(IPatientService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Patient> patients = await _service.GetPatientsAsync();

            if (patients.Count() == 0)
            {
                return NoContent();
            }

            return Ok(patients);
        }

        [HttpGet("{id}/examinations")]
        public async Task<IActionResult> Get(int id)
        {
            Patient? patient = await _service.GetPatientByIdAsync(id);

            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Patient patient)
        {
            await _service.CreatePatientAsync(patient);
            return Created();
        }
    }
}
