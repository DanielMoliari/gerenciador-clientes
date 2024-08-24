<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        URL::forceScheme('https');

        $clientes = Cliente::latest()->paginate(9);
        return inertia('Clientes', ['clientes' => $clientes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Criar');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:clientes,email'],
            'cpf' => ['required', 'cpf', 'unique:clientes,cpf'],
        ], [
            'nome.required' => 'O nome é obrigatório.',
            'nome.string' => 'O nome deve ser um texto válido.',
            'nome.max' => 'O nome não pode exceder 255 caracteres.',

            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Por favor, forneça um endereço de email válido.',
            'email.max' => 'O email não pode exceder 255 caracteres.',
            'email.unique' => 'Este email já está em uso.',

            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.cpf' => 'Por favor, forneça um CPF válido.',
            'cpf.unique' => 'Este CPF já está cadastrado.',
        ]);

        Cliente::create($fields);

        return redirect('/')->with('success', 'Cliente cadastrado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        return inertia('VerDetalhes', ['cliente' => $cliente]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        return inertia("Editar", ['cliente' => $cliente]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        $fields = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:clientes,email,' . $cliente->id],
            'cpf' => ['required', 'cpf', 'unique:clientes,cpf,' . $cliente->id],
        ], [
            'nome.required' => 'O nome é obrigatório.',
            'nome.string' => 'O nome deve ser um texto válido.',
            'nome.max' => 'O nome não pode exceder 255 caracteres.',

            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Por favor, forneça um endereço de email válido.',
            'email.max' => 'O email não pode exceder 255 caracteres.',
            'email.unique' => 'Este email já está em uso.',

            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.cpf' => 'Por favor, forneça um CPF válido.',
            'cpf.unique' => 'Este CPF já está cadastrado.',
        ]);

        $cliente->update($fields);

        return redirect('/')->with('success', 'As informações do cliente foram editadas!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return redirect('/')->with('message', 'Cliente excluído com sucesso!');
    }
}
