using Core.Interfaces;
using DataAccess.Contexts;
using DataAccess.Repositories;
using Core.Services;
using Core.Interfaces.Services;
using FluentMigrator.Runner;
using DataAccess.Migrations;
using DataAccess.Extensions;
using Core.Interfaces.Repositories;
using FluentValidation;
using Core.Models;
using Core.Validators;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IExaminationRepository, ExaminationRepository>();
builder.Services.AddScoped<IExaminationService, ExaminationService>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IValidator<Patient>, PatientValidator>();
builder.Services.AddScoped<IValidator<Examination>, ExaminationValidator>();

builder.Services.AddFluentValidationAutoValidation();


builder.Services.AddSingleton<EasyClinicContext>();
builder.Services.AddLogging(c => c.AddFluentMigratorConsole())
        .AddFluentMigratorCore()
        .ConfigureRunner(c => c.AddSqlServer2012()
            .WithGlobalConnectionString(builder.Configuration.GetConnectionString("EasyClinicConn"))
            .ScanIn(typeof(M0004_ChangePatientGender).Assembly).For.Migrations());



var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}


app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});


app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.MigrateDatabase();

app.Run();
