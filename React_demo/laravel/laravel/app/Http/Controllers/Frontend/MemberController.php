<?php

namespace App\Http\Controllers\frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\frontend\MemberLoginRequest;
use Illuminate\Support\Facades\Auth;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $getAllMember = User::find(Auth::id())->toArray();
        // dd($getAllMember);
    }

    /**
     * Display a member.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $getMember = User::find(Auth::id())->toArray();
        return view('frontend.member.profile', compact('getMember'));
    }
    /**
     * Show login form
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showLogin()
    {
        return view('frontend.member.login');
    }

    /**
     * Do login
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function login(MemberLoginRequest $request)
    {
        $login = [
            'email' => $request->email,
            'password' => $request->password,
            'level' => 0
        ];

        $remember = false;

        if ($request->remember_me) {
            $remember = true;
        }


        if ($this->doLogin($login, $remember)) {
            return redirect('/');
        } else {
            return redirect()->back()->withErrors('Email or password is not correct.');
        }
    }
    /**
     * Do login
     *
     * @param $attempt
     * @param $remember
     * @return bool
     */
    protected function doLogin($attempt, $remember)
    {
        
        if (Auth::attempt($attempt, $remember)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Logout
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }

}
