@extends('frontend.layouts.app')

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Profile</div>

                <div class="card-body">
                    <?php
                        var_dump($getMember);
                    ?>
                </div>
            </div>
        </div>
    </div>
@endsection
